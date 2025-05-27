import "./Userbar.css";

export default function Userbar({ name = "", link = "" }) {
  return (
    <div className="userbar">
      <div className="userbar__tooltip">{name}</div>
      {link ? (
        <img
          className="userbar__avatar userbar__avatar_image"
          src={link}
          alt="Avatar"
        />
      ) : (
        <div className="userbar__avatar userbar__avatar_default">
          {name?.[0]?.toUpperCase()}
        </div>
      )}
    </div>
  );
}
