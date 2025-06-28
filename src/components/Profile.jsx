import "./styles/Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

export default function Profile({ clothesData, onLogOut }) {
  return (
    <section className="profile">
      <SideBar onLogOut={onLogOut} />
      <ClothesSection clothesData={clothesData} />
    </section>
  );
}
