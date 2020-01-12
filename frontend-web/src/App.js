import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import { authorsActionCreators, publicationsActionCreators} from './actionCreators';
import SideNav from './components/SideNav';
import Main from './components/Main';
import Modal from './components/Modal';

const Div = styled.div({
  margin: 0,
  padding: 0,
  background: '#fafaf3',
  display: 'flex'
});

class App extends React.Component {
  componentDidMount() {
    this.props.getAuthors();
    this.props.getPublications();
  }
  render () {
    return (
      <Div>
        <SideNav />
        <Main/>
        <Modal/>
      </Div>
    )
  }
}

const mapDispatchToProps = {
  getAuthors: authorsActionCreators.getAuthors,
  getPublications: publicationsActionCreators.getPublications
}

const mapStateToProps = (state) => ({
  authors: state.authors.authors,
  publications: state.publications.publications
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
