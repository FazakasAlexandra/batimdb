import React from 'react';
import './EditPage.css';
import { withRouter } from 'react-router-dom';
import EditMovieDetails from '../../Components/EditMovieDetails/EditMovieDetails';
import axios from 'axios';

class EditPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movieDetail: null,
            error: null,
        };
    }

    componentDidMount() {
        const movieId = this.props.match.params.movieId;
        this.getMovieById(movieId);
    }

    getMovieById = async (movieId) => {
        console.log('aici e getMovieById');
        try {
            const response = await axios.get(`http://ancient-caverns-16784.herokuapp.com/movies/${movieId}`);
            this.setState({ movieDetail: response.data });
        }
        catch (error) {
            this.setState({ error: error });
        }
    }

    render() {
        const { movieDetail, error } = this.state;
        const { auth, token, } = this.props;
        // if (error) {
        //     return (
        //         <div>
        //             <h1>Invalid movie, try again</h1>
        //         </div>
        //     );
        // }

        return (
            <div style={{ marginTop: 180 }}>
                {
                    movieDetail ?
                        (
                            <EditMovieDetails
                                movieDetail={movieDetail}
                                auth={auth}
                                token={token}
                            />
                        )
                        :
                        (
                            error ? (<h1>Invalid movie, try again</h1>) : null
                        )
                }
            </div>
        )
    }
}

export default withRouter(EditPage);