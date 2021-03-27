import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./JobPosting.css";

// just the card for creating a job posting 
const JobPosting = () => {
  return (
    <div>
      <div className="posting">
        <div class="card text-black bg-light mb-3" style={{ width: "40rem" }}>
          <div class="card-body">
            <h1 class="card-title center-align"> Create Job Posting</h1>
            
            <Form> 
              <Form.Group controlId="formTitle"> 
                <div className="row">
                  <div className="col s1">
                    <Form.Label> <h6> Title: </h6> </Form.Label>
                  </div>
                  <div className="col s11">
                    <Form.Control size = "sm" placeholder="Enter Title" />
                  </div>
                </div>
              </Form.Group>
            </Form> 
  ​
            <Form>
              <Form.Group controlId="formLocation">
              <div className="row">
                  <div className="col s2">
                      <Form.Label> <h6> Location: </h6> </Form.Label>
                  </div>
                  <div className="col s10">
                    <Form.Control placeholder="Enter Location" />
                  </div>
                </div>
              </Form.Group>
            </Form>
  ​
            <Form>
              <Form.Group controlId="formApplicationDeadline">
              <div className="row">
                  <div className="col s4">
                      <Form.Label> <h6> Application Deadline: </h6> </Form.Label>
                  </div>
                  <div className="col s8">
                    <Form.Control placeholder="Enter Application Deadline" />
                  </div>
                </div>
              </Form.Group>
            </Form>
  ​
            <Form>
              <Form.Group controlId="formDescription">
              <div className="row">
                  <div className="col s2">
                      <Form.Label> <h6> Description: </h6> </Form.Label>
                  </div>
                  <div className="col s10">
                    <Form.Control placeholder="Enter Description" />
                  </div>
                </div>
              </Form.Group>
            </Form>
  ​
            <div className="row">
              <div className="col s2">
                  <Button type="cancel" class="btn hoverable danger accent-2">Cancel</Button>
              </div>
              <div className="col s10">
                  <Button type="submit" class="btn hoverable primary accent-2">Create</Button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
