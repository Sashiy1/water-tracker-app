import css from "./UserSettingsForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaExclamation } from "react-icons/fa";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { apiGetCurrentUser, apiUpdateUser } from "../../redux/user/operations";
import UserAvatar from "../UserAvatar/UserAvatar";
import CustomToast from "../Toasts/CustomToast/CustomToast";

const validationSchema = Yup.object({
  gender: Yup.string().required("Please pick one"),
  name: Yup.string()
    .max(12, "Name must be 12 characters or less")
    .matches(/^\S*$/, "Name must not contain spaces")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  weight: Yup.number()
    .min(20, "Weight must be at least 20kg")
    .max(200, "Weight must be 200kg or less")
    .required("Weight is required"),
  activeTime: Yup.number()
    .min(0, "Active time must be at least 0 minutes")
    .max(600, "Active time must be 600 minutes or less")
    .required("Active time is required"),
  water: Yup.number()
    .min(1, "Water intake must be at least 1 liter")
    .max(4, "Water intake must be 4 liters or less")
    .required("Water intake is required"),
});

const INITIAL_FORM_DATA = {
  gender: "",
  name: "",
  email: "",
  weight: "",
  activeTime: "",
  water: "",
};

const UserSettingsForm = ({ closeModal }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const calculateWaterIntake = (weight, activeTime, gender) => {
    let waterIntake;
    if (gender === "man") {
      waterIntake = weight * 0.03 + (activeTime / 60) * 0.6;
    } else if (gender === "woman") {
      waterIntake = weight * 0.03 + (activeTime / 60) * 0.4;
    } else {
      waterIntake = 2;
    }

    // Заокруглюємо до одного знака після коми
    return parseFloat(waterIntake.toFixed(1));
  };

  const handleChanges = async (formData, formActions) => {
    try {
      await dispatch(apiUpdateUser(formData)).unwrap();
      await dispatch(apiGetCurrentUser()).unwrap();
      CustomToast(
        true,
        "Profile Updated! Your changes have been saved successfully."
      );
    } catch (error) {
      CustomToast(false, "Failed to update profile");
    }

    formActions.resetForm();
    closeModal();
  };

  return (
    <div className={css.formBox}>
      <UserAvatar user={user} />
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          ...INITIAL_FORM_DATA,
          gender: user.gender || "",
          name: user.name || "",
          email: user.email || "",
          weight: user.weight || "",
          activeTime: user.timeActivity || "",
          water: user.dailyNorma ? user.dailyNorma / 1000 : "2", // Convert to liters if needed
        }}
        onSubmit={handleChanges}
      >
        {({ values }) => {
          // Calculate the water intake whenever weight, activeTime or gender changes
          const suggestedAmount = calculateWaterIntake(
            parseFloat(values.weight) || 0,
            parseFloat(values.activeTime) || 0,
            values.gender
          );

          return (
            <Form className={css.form}>
              <div className={css.flexBox}>
                <div className={css.dataBox}>
                  <p className={css.labelBoldText}>Your gender identity</p>
                  <div className={css.genderBox}>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="gender"
                        value="woman"
                      />
                      <span className={css.radioLabelText}>Woman</span>
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="gender"
                        value="man"
                      />
                      <span className={css.radioLabelText}>Man</span>
                      <ErrorMessage
                        name="gender"
                        component="span"
                        className={css.errorMessageRadio}
                      />
                    </label>
                  </div>

                  <label className={css.label}>
                    <span className={css.labelBoldText}>Your name</span>
                    <Field
                      className={css.formInput}
                      type="string"
                      name="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className={css.errorMessage}
                    />
                  </label>

                  <label className={css.label}>
                    <span className={css.labelBoldText}>Email</span>
                    <Field
                      className={css.formInput}
                      type="email"
                      name="email"
                      readOnly
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className={css.errorMessage}
                    />
                  </label>

                  <p className={css.labelBoldText}>My daily norma</p>
                  <div className={css.genderInfoBox}>
                    <p className={css.labelText}>
                      For woman:{" "}
                      <span className={css.span}>V=(M*0,03) + (T*0,4)</span>{" "}
                    </p>
                    <p className={css.labelText}>
                      For man:{" "}
                      <span className={css.span}>V=(M*0,03) + (T*0,6)</span>{" "}
                    </p>
                  </div>
                  <p className={css.explText}>
                    * V is the volume of the water norm in liters per day, M is
                    your body weight, T is the time of active sports, or another
                    type of activity commensurate in terms of loads (in the
                    absence of these, you must set 0)
                  </p>
                </div>
                <div className={css.addInfoBox}>
                  <label className={css.label}>
                    <span className={css.labelText}>
                      Your weight in kilograms:
                    </span>
                    <Field
                      className={css.formInput}
                      type="number"
                      name="weight"
                    />
                    <ErrorMessage
                      name="weight"
                      component="span"
                      className={css.errorMessage}
                    />
                  </label>
                  <label className={css.label}>
                    <span className={css.labelText}>
                      The time of active participation in sports:
                    </span>
                    <Field
                      className={css.formInput}
                      type="number"
                      name="activeTime"
                      step="10"
                    />
                    <ErrorMessage
                      name="activeTime"
                      component="span"
                      className={css.errorMessage}
                    />
                  </label>
                  <p className={css.labelText}>
                    The required amount of water in liters per day:{" "}
                    <span className={css.spanLiters}>{suggestedAmount} L</span>
                  </p>
                  <label className={css.label}>
                    <span className={css.labelBoldText}>
                      Write down how much water you will drink:
                    </span>
                    <Field
                      className={css.formInput}
                      type="number"
                      name="water"
                      step="0.1"
                    />
                    <ErrorMessage
                      name="water"
                      component="span"
                      className={css.errorMessage}
                    />
                  </label>
                  <p className={css.labelText}>
                    {" "}
                    <span className={css.exclamation}>
                      <FaExclamation />
                    </span>{" "}
                    Fill your active time in minutes
                  </p>
                  <p className={css.labelText}>
                    {" "}
                    <span className={css.exclamation}>
                      <FaExclamation />
                    </span>{" "}
                    Amount of water in liters
                  </p>
                </div>
              </div>

              <button
                className={css.formBtn}
                type="submit"
                title="click to edit personal info"
                aria-label="edit personal info"
              >
                Save
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

UserSettingsForm.propTypes = {
  closeModal: PropTypes.func,
};

export default UserSettingsForm;
