import React, { Component } from 'react';
import './../App.css';
import { Button, Modal } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import ProfileCard from './ProfileCard';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

class NewLoanModal extends Component {
    handleSocialLogin = (user) => {
        this.props.setUser(user);
        this.props.handleClose()
    }

    handleSocialLoginFailure = (err) => {
        console.error(err);
        alert("Sign in with Social media failed. Please check yout network configuration or try signing in with some other social media")
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>New loan application</Modal.Title>
                </Modal.Header>
                <Modal.Body className="new-loan-modal-container">
                    <ProfileCard user={this.props.user}/>
                    <hr/>
                    <Form
                      onSubmit={onSubmit}
                      initialValues={{ stooge: 'larry', employed: false }}
                      render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                          <div>
                            <label>First Name</label>
                            <Field
                              name="firstName"
                              component="input"
                              type="text"
                              placeholder="First Name"
                            />
                          </div>
                          <div>
                            <label>Last Name</label>
                            <Field
                              name="lastName"
                              component="input"
                              type="text"
                              placeholder="Last Name"
                            />
                          </div>
                          <div>
                            <label>Employed</label>
                            <Field name="employed" component="input" type="checkbox" />
                          </div>
                          <div>
                            <label>Favorite Color</label>
                            <Field name="favoriteColor" component="select">
                              <option />
                              <option value="#ff0000">❤️ Red</option>
                              <option value="#00ff00">💚 Green</option>
                              <option value="#0000ff">💙 Blue</option>
                            </Field>
                          </div>
                          <div>
                            <label>Toppings</label>
                            <Field name="toppings" component="select" multiple>
                              <option value="chicken">🐓 Chicken</option>
                              <option value="ham">🐷 Ham</option>
                              <option value="mushrooms">🍄 Mushrooms</option>
                              <option value="cheese">🧀 Cheese</option>
                              <option value="tuna">🐟 Tuna</option>
                              <option value="pineapple">🍍 Pineapple</option>
                            </Field>
                          </div>
                          <div>
                            <label>Sauces</label>
                            <div>
                              <label>
                                <Field
                                  name="sauces"
                                  component="input"
                                  type="checkbox"
                                  value="ketchup"
                                />{' '}
                                Ketchup
                              </label>
                              <label>
                                <Field
                                  name="sauces"
                                  component="input"
                                  type="checkbox"
                                  value="mustard"
                                />{' '}
                                Mustard
                              </label>
                              <label>
                                <Field
                                  name="sauces"
                                  component="input"
                                  type="checkbox"
                                  value="mayonnaise"
                                />{' '}
                                Mayonnaise
                              </label>
                              <label>
                                <Field
                                  name="sauces"
                                  component="input"
                                  type="checkbox"
                                  value="guacamole"
                                />{' '}
                                Guacamole 🥑
                              </label>
                            </div>
                          </div>
                          <div>
                            <label>Best Stooge</label>
                            <div>
                              <label>
                                <Field
                                  name="stooge"
                                  component="input"
                                  type="radio"
                                  value="larry"
                                />{' '}
                                Larry
                              </label>
                              <label>
                                <Field
                                  name="stooge"
                                  component="input"
                                  type="radio"
                                  value="moe"
                                />{' '}
                                Moe
                              </label>
                              <label>
                                <Field
                                  name="stooge"
                                  component="input"
                                  type="radio"
                                  value="curly"
                                />{' '}
                                Curly
                              </label>
                            </div>
                          </div>
                          <div>
                            <label>Notes</label>
                            <Field name="notes" component="textarea" placeholder="Notes" />
                          </div>
                          <div className="buttons">
                            <button type="submit" disabled={submitting || pristine}>
                              Submit
                            </button>
                            <button
                              type="button"
                              onClick={form.reset}
                              disabled={submitting || pristine}
                            >
                              Reset
                            </button>
                          </div>
                          <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                      )}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={() => this.props.handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default NewLoanModal;
