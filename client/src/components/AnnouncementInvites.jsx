import { useUsers } from "../contexts/UsersContext";

import Invite from "../components/Invite";

const AnnouncementInvites = () => {
  const { currentInvitations } = useUsers();

  return (
    <div>
      <ul className="flex flex-col gap-3">
        {currentInvitations.map((invite) => (
          <li key={invite.id}>
            <Invite invite={invite} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementInvites;
