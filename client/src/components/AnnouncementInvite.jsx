/* eslint-disable react/prop-types */
import { useUsers } from "../contexts/UsersContext";

const AnnouncementInvite = ({ invitation }) => {
  const { currentUser, currentFamily } = useUsers();

  const { invitor, invitee, role } = invitation;

  const userId = currentUser.id;

  const isInvitor = invitor.id === userId;
  const isInvitee = invitee.id === userId;

  const roleStr = (role) => {
    if (role === "primary") return "Primary Guardian";
    if (role === "extended") return "Extended Family Guardian";
    if (role === "third") return "Friend/Neighbor";
  };

  const partialMessage = isInvitee
    ? `You have received an invite from ${invitor.firstName} ${invitor.lastName}`
    : `You sent an invite to ${invitee.firstName} ${invitee.lastName}`;

  const message = `${partialMessage} to join family ${currentFamily.familyName} as ${roleStr(role)}.`;

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
      <span>{message}</span>
    </div>
  );
};

export default AnnouncementInvite;
