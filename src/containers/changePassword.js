import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./ChangePassword.css";
import { ChevronLeft } from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, CardTitle, CardText, FormGroup, Label, Input, Button } from 'reactstrap';



export default function ChangePassword() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const [isChanging, setIsChanging] = useState(false);

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.password.length > 0 &&
      fields.password.length<=25 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleChangeClick(event) {
    event.preventDefault();

    setIsChanging(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        fields.oldPassword,
        fields.password
      );

      history.push("/settings");
    } catch (error) {
      onError(error);
      setIsChanging(false);
    }
  }

  return (
        
          <Form>
              <h3 className="card-header">Forgot Password</h3>
              <div className="card-body">
                  <div className="form-group">
                      <label>Email</label>
                      <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-row">
                      <div className="form-group col">
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                              {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                              Submit
                          </button>
                          <Link to="login" className="btn btn-link">Cancel</Link>
                      </div>
                  </div>
              </div>
          </Form>

    
  );
}
