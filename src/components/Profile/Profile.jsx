import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile(props) {
  const { userData, clothesData, handleOpenModal } = props;
  return (
    <section className="profile">
      <SideBar userData={userData} />
      <ClothesSection
        clothesData={clothesData}
        handleOpenModal={handleOpenModal}
      />
    </section>
  );
}
