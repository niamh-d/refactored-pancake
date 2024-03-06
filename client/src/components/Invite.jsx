/* eslint-disable react/prop-types */
import { useUsers } from "../contexts/UsersContext";

function roleStr(role) {
  if (role === "primary") return "Primary Guardian";
  if (role === "extended") return "Extended Family";
  if (role === "third") return "Friend/Neighbor";
}

const Invite = ({ invite }) => {
  const { currentUser, closeInvite, acceptInvite } = useUsers();
  const {
    invitee,
    inviteeName,
    inviteeRole,
    invitorName,
    invitorFamilyName,
    id,
  } = invite;

  const isInvitee = invitee === currentUser.id;

  const closeClickHandler = () => closeInvite(id);
  const acceptClickHandler = () => acceptInvite(invite);

  const closeButtonMessage = isInvitee ? "Decline invite" : "Cancel invite";

  const partialMessage = isInvitee
    ? `You have received an invite from ${invitorName}`
    : `You sent an invite to ${inviteeName}`;

  const message = `${partialMessage} to join family ${invitorFamilyName} as ${roleStr(inviteeRole)}.`;

  return (
    <div role="alert" className="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div className="flex gap-10">
        <span>{message}</span>
        {isInvitee && (
          <button
            className="btn btn-accent btn-sm"
            onClick={acceptClickHandler}
          >
            Accept
          </button>
        )}
        <button className="btn bnt-ghost btn-sm" onClick={closeClickHandler}>
          {closeButtonMessage}
        </button>
      </div>
    </div>
  );
};

export default Invite;
