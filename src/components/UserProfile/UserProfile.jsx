import "./UserProfile.css";

export default function UserProfile({ name = "", link = "" }) {
  return (
    <div className="profile">
      <div className="profile__tooltip">{name}</div>
      {link ? (
        <img
          className="profile__avatar profile__avatar_image"
          src={link}
          alt="Avatar"
        />
      ) : (
        <div className="profile__avatar profile__avatar_default">
          {name?.[0]?.toUpperCase()}
        </div>
      )}
    </div>
  );
}
