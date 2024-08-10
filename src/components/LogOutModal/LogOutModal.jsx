import { useDispatch } from "react-redux";
import Icon from "../Icon/Icon";
import css from "./LogOutModal.module.css";
import { apiLogOutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const LogOutModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {

    try {
      await    dispatch(apiLogOutUser());
      navigate("/");
      toast.success(
        "You have been signed out. See you next time!",
        {
          duration: 5000,
        }
      );
    } catch (error) {
      toast.error(error || "Failed to log out", {
        duration: 5000,
      });
    }
  
   
    closeModal();
  };

  return (
    <div className={css.deleteBox}>
      <button type="button" onClick={closeModal} className={css.iconExitBtn}>
        {" "}
        <Icon width="24" height="24" iconName="x" className={css.iconExit} />
      </button>
      <p className={css.title}>Delete entry</p>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.buttonsBox}>
        <button onClick={handleLogOut} className={css.deleteBtn}>
          Log out
        </button>
        <button onClick={closeModal} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
};

LogOutModal.propTypes = {
  closeModal: PropTypes.func,
};

export default LogOutModal;
