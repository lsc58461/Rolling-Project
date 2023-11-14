import Card from "../Card";
import CardProfileImage from "../CardImage/CardProfileImage";
import CardProfile from "../CardProfile/CardProfile";
import CardContent from "../CardContent/CardContent";
import CardDate from "../CardDate/CardDate";
import Modal from "../../Modal/Modal";
import CardModal from "../../Modal/CardModal";
import Button from "../../Button/Button";
import style from "./CardBody.module.css";
import bin from "../../../assets/images/icons/bin.svg";
import { useLocation } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";
import { convertDateFormat } from "../../../utils/convertDateFormat";
const CardBody = ({ item, items, index, myRef }) => {
  const location = useLocation();
  const isEditPage = location.pathname.endsWith("edit");
  const { profileImageURL, sender, relationship, content, createdAt } = item;

  const convertedDate = convertDateFormat(createdAt);
  const { year, month, day } = convertedDate;
  const prettyCreatedAt = `${year}. ${month}. ${day}`;

  const { isModalVisible, openModalFunc, closeModalFunc } = useModal();

  return (
    <>
      <div className={style.root} onClick={openModalFunc}>
        <Card>
          <div className={style.header}>
            <CardProfileImage profileImageURL={profileImageURL} />
            <CardProfile sender={sender} relationship={relationship} />
            {isEditPage && <img className={style.bin} src={bin} alt="bin" />}
          </div>
          <div className={style.divider}></div>
          <CardContent content={content} />
          <CardDate createdAt={prettyCreatedAt} />
          {index === items?.length - 1 && <p ref={myRef}></p>}
        </Card>
      </div>
      {isModalVisible && (
        <Modal>
          <CardModal item={item} createdAt={prettyCreatedAt} />
          <Button onClick={closeModalFunc} width="12" size="40" color="primary">
            확인
          </Button>
        </Modal>
      )}
    </>
  );
};

export default CardBody;
