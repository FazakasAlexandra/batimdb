import React from 'react'
import './Menus.css'
import '../../../Fontawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdowns } from './Menus/Dropdowns.jsx'
import { withTheme } from 'styled-components';


class Menus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOn: false
        }
    }

    render() {
        let { menuOn } = this.state
        const { auth, token } = this.props;
        return (
            <>
                {/* large menu */}
                <div className='dropdown-menus-container' style={this.props.theme.backgroundMenu}>
                    <Dropdowns
                        filterMovies={(filterClass, filter) => this.props.filter(filterClass, filter)}
                        filterMoviesByRange={(filter, value) => this.props.filterMoviesByRange(filter, value)}
                        auth={auth}
                        token={token}
                    />
                </div>

                {/* small menu */}
                <>
                    <span className="bars-container">
                        <FontAwesomeIcon icon={'bars'} onClick={() => { this.setState({ menuOn: !menuOn }) }} />
                    </span>
                    <div className='small-dropdown-menus-container' style={{ display: menuOn ? 'flex' : 'none' }} >
                        <Dropdowns
                            filter={(filterClass, filter) => this.props.filter(filterClass, filter)}
                            filterMoviesByRange={(filter, value) => this.props.filterMoviesByRange(filter, value)}
                            auth={auth}
                            token={token}
                        />
                    </div>
                </>
            </>
        )
    }
}

export default withTheme(Menus);

