import "./SideBar.css";
import Userbar from "../Userbar/Userbar";

export default function SideBar({ userData }) {
  function Userbar({ name = "", link = "" }) {
    return (
      <div className="sidebar__userbar">
        {link ? (
          <img
            className="sidebar__avatar sidebar__avatar_image"
            src={link}
            alt="Avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_default">
            {name?.[0]?.toUpperCase()}
          </div>
        )}
        <div className="sidebar__tooltip">
          <p className="sidebar__name">{name}</p>
          <button className="sidebar__button sidebar__button_type_edit">
            Change profile data
          </button>
          <button className="sidebar__button sidebar__button_type_edit">
            Log out
          </button>
        </div>
      </div>
    );
  }
  return (
    <aside className="sidebar">
      <Userbar name={userData.name} link={userData.avatarLink} />
    </aside>
  );
}
