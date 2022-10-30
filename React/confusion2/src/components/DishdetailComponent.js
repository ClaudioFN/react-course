import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import { Link } from 'react-router-dom';

    function RenderDish({ dish }) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }else{
            return(
                <div>HOHO-</div>
            )
        }
    }

    function RenderComment({ comments }){
        if (comments != null) {
            const comment = comments.map((com) => {
                return (
                    <div className='col-12 col-md-5 m-1'>
                        <Card>
                            <CardBody>
                                <CardTitle>{com.author}</CardTitle>
                                <CardText>{com.comment}</CardText>
                                <CardText>{new Intl.DateTimeFormat().format(new Date(com.date))}</CardText>
                                <CardText>{com.rating} &#11088; </CardText> 
                            </CardBody>
                        </Card>
                    </div>
                );
            });

            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4> Comments </h4>
                    <p> {comment} </p> 
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
                    </div>
                    <div className='row'>
                        <RenderDish dish={props.dish} />
                        <RenderComment comments={props.comments} />
                    </div>
                </div>
            );
    }
   


export default DishDetail;