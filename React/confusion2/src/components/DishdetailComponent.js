import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';

import { Link } from 'react-router-dom';

import {  LocalForm, Errors, Control } from 'react-redux-form';  // Assignment 3

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

export class CommentWriter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is DishDetail: " + JSON.stringify(values));
        alert("Current state is DishDetail: " + JSON.stringify(values));
        //
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Your Comment Comment Here!</ModalHeader>
                    <ModalBody>
                        <div className='row row-content'>
                            <div className='col-12 col-md-12'>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className='form-group'>
                                        <Label htmlFor='.rating' md={5}>Rating </Label>
                                        <Col md={{size:12}}>
                                            <Control.select model='.rating' className='form-control' type='select' name='rating' >
                                                <option>1</option> 
                                                <option>2</option> 
                                                <option>3</option> 
                                                <option>4</option> 
                                                <option>5</option> 
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className='form-group'>
                                        <Label htmlFor='name' md={10}>Your Name</Label>
                                        <Col md={12}>
                                            <Control.text model='.author' className='form-control' id='author' name='author' placeholder='Type Your Name Here!' 
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                            <Errors className='text-danger' model='.author' show='touched' messages={{
                                                required: 'Required - ',
                                                minLength: 'Name must be greater than 3 characters!',
                                                maxLength: 'Name must be inferior than 15 characters!'
                                            }}></Errors>
                                        </Col>
                                    </Row>
                                    
                                    <Row className='form-group'>
                                        <Label htmlFor='message' md={5}>Comment</Label>
                                        <Col md={12}>
                                            <Control.textarea model='.message' className='form-control' id='message' name='message' placeholder='Message' rows='12' />
                                        </Col>
                                    </Row>
                                    <Row className='form-group'>
                                        <Button type='submit' color='primary'>Submit</Button>
                                    </Row>
                                </LocalForm>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    function RenderDish({ dish }) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform in transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                         }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );
        }else{
            return(
                <div>HOHO-</div>
            )
        }
    }

    function RenderComment({ comments, postComment, dishId }){
        if (comments != null) {
            const comment = comments.map((com) => {
                return (
                    <div>
                        <Stagger in>
                            <Card>
                                <CardBody>
                                    <Fade in>
                                        <CardTitle>{com.author}</CardTitle>
                                        <CardText>{com.comment}</CardText>
                                        <CardText>{new Intl.DateTimeFormat().format(new Date(com.date))}</CardText>
                                        <CardText>{com.rating} &#11088; </CardText> 
                                    </Fade>
                                </CardBody>
                            </Card>
                        </Stagger>
                    </div>
                );
            });

            return (
                <div  className='col-12 col-md-6 m-1'>
                    <h4> Comments </h4>
                    <p> {comment} </p> 
                    <CommentWriter dishId={dishId} postComment={postComment} />
                </div>
                
            );
        }else{
            return(
                <div>HIHI</div>
            )
        }
    }


    const DishDetail = (props) => {
            const dish = props.dish;
            if (props.isLoading) {
                return (
                    <div className='container'>
                        <div className='row'>
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (props.errMess) {
                return (
                    <div className='container'>
                        <div className='row'>
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }


            if(dish == null){
                return(<div>HAHA</div>);
            }
            //const dishesToShow = RenderDish(props.dish);
            //const dishComments = RenderComment(props.dish.comments);
            return( 
                <div class='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                        <RenderDish dish={props.dish} />
                        <RenderComment comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                    </div>
                </div>
            );
    }
   


export default DishDetail;