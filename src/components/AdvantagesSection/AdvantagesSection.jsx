import { apiGetTotalUsers } from "../../redux/user/operations";
import { selectUserCount } from "../../redux/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import css from "./AdvantagesSection.module.css";

import user1 from "../../../assets/img/user1.png";
import user2 from "../../../assets/img/user2.png";
import user3 from "../../../assets/img/user3.png";

export const AdvantagesSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(apiGetTotalUsers()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const totalUsers = useSelector(selectUserCount);

  return (
    <div className={css.advantagesSection}>
      <div className={css.customersBox}>
        <ul className={css.customersList}>
          <li className={css.customersItem}>
            <img className={css.customersImg} src={user1} alt="user1" />
          </li>

          <li className={css.customersItem}>
            <img className={css.customersImg} src={user2} alt="user2" />
          </li>

          <li className={css.customersItem}>
            <img className={css.customersImg} src={user3} alt="user3" />
          </li>
        </ul>

        <p className={css.customersText}>
          Our <span className={css.span}>{totalUsers}</span> happy
          <br />
          customers
        </p>
      </div>

      <div className={css.group}>
        <ul className={css.advantagesGroup}>
          <li className={css.textAdvantage}>
            <div className={css.circle}></div>
            <p className={css.text}>Habit drive</p>
          </li>
          <li className={css.textAdvantage}>
            <p className={css.textBlack}>View statistics</p>
          </li>
          <li className={css.textAdvantage}>
            <p className={css.textBlack}>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
