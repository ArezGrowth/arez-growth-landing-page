# Arez Email Validation Policy v1

For lead/demo forms, Arez should reduce fake email submissions without requiring an email-confirmation step.

Required layers:
1. Browser `type=email` + required field.
2. Local syntax normalization/validation.
3. Reject known disposable/temporary email domains.
4. Before production enforcement of mailbox reachability, add a server-side validation service/API that checks domain/MX and, where supported, deliverability/risk. Never expose its API key in frontend JavaScript.
5. Fail safely: service outages must not be represented as proof that an address is fake.
6. UX: rejected submissions show a clear red inline error such as `Please enter a real, valid email address.`

Truthfulness constraint: without sending a verification message, Arez must never claim 100% proof that a mailbox exists or belongs to the submitter. Deliverability checks reduce fake addresses but are probabilistic.
