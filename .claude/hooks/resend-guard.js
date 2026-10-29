// Guard for the Resend MCP server (see CLAUDE.md, rule 2).
// Sending is allowed only to Resend test addresses (@resend.dev) and the owner's own address.
// Anything that would send to people we can't check (broadcasts, automations, saved drafts) is blocked.

const OWNER = 'owaisdurvesh@gmail.com';

// Tools that send to the addresses in their own to/cc/bcc fields.
const DIRECT_SEND = [
  'send-email',
  'send-new-inbox-email',
  'reply-to-inbox-thread-email',
  'forward-inbox-thread-email',
];

// Tools that send to recipients the guard can't see, so they are always blocked.
const ALWAYS_BLOCK = [
  'send-broadcast',
  'send-inbox-draft',
  'create-automation',
  'update-automation',
  'duplicate-automation',
];

function allowed(address) {
  const match = String(address).match(/<([^>]+)>/);
  const email = (match ? match[1] : String(address)).trim().toLowerCase();
  return email === OWNER || /^[^@\s]+@resend\.dev$/.test(email);
}

function list(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function recipients(message) {
  return [...list(message.to), ...list(message.cc), ...list(message.bcc)];
}

function check(tool, input) {
  if (ALWAYS_BLOCK.includes(tool)) {
    return `${tool} sends to recipients this guard can't check.`;
  }

  let addresses = null;
  if (DIRECT_SEND.includes(tool)) {
    addresses = recipients(input);
  } else if (tool === 'send-batch-emails') {
    addresses = list(input.emails).flatMap(recipients);
  } else if (tool === 'send-event') {
    if (!input.email) return 'send-event without an email address can start an automation for any contact.';
    addresses = [input.email];
  } else if ((tool === 'create-broadcast' || tool === 'update-broadcast') && (input.send || input.scheduledAt)) {
    return `${tool} with send or scheduledAt would send a broadcast.`;
  } else {
    return null; // Not a sending tool.
  }

  if (addresses.length === 0) {
    return `${tool} has no recipient the guard can check.`;
  }
  const blocked = addresses.filter((a) => !allowed(a));
  if (blocked.length > 0) {
    return `not an allowed address: ${blocked.join(', ')}`;
  }
  return null;
}

function decide(reason) {
  if (!reason) process.exit(0);
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason:
        `Resend guard blocked this: ${reason} Only @resend.dev test addresses and ${OWNER} are allowed (CLAUDE.md, rule 2).`,
    },
  }));
  process.exit(0);
}

let raw = '';
process.stdin.on('data', (chunk) => { raw += chunk; });
process.stdin.on('end', () => {
  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    decide('the tool call could not be read.');
    return;
  }
  const tool = String(event.tool_name || '').replace(/^mcp__resend__/, '');
  decide(check(tool, event.tool_input || {}));
});
