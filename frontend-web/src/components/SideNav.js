
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { publicationsActionCreators } from '../actionCreators';

const ParentDiv = styled.div({
  color: 'white',
  height: '100vh',
  background: '#5a5252',
  width: '13rem',
  textTransform: 'capitalize',
  paddingTop: '1rem'
});

const ListAdmin = styled.div({
  height: '3rem',
  paddingLeft: '1rem',
  cursor: 'pointer',
  
});

const ListAdminContainer = styled.div({
  paddingTop: '1rem',
  borderTop: '0.5px white inset'
});



const AuthorsHeader = styled.h4({
  color: 'white',
  paddingLeft: '1rem',
  marginTop: '0rem',
  marginBottom: '1rem',
  cursor: 'pointer'
});

const Container = styled.div({
  margin: 0,
  padding: 0,
  display: 'flex'
});

function SideNav(props) {
  return (
    <Container>
      <ParentDiv>
        <AuthorsHeader
          onClick={() => props.getPublications()}>
          Authors
        </AuthorsHeader>
        <ListAdminContainer>
          {props.authors.map(author =>
            <ListAdmin key={author.id} onClick={() => props.getPublicationsFromAuthor(author)}>
              {`${author.firstName} ${author.lastName}`}
            </ListAdmin>
          )}
        </ListAdminContainer>
      </ParentDiv>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  authors: state.authors.authors,
  publications: state.publications.publications
});

const mapDispatchToProps = {
  getPublicationsFromAuthor: publicationsActionCreators.getPublicationsFromAuthor,
  getPublications: publicationsActionCreators.getPublications
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
