import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { publicationsActionCreators, toggleModal } from '../actionCreators';
import { SORT, SEARCH } from '../utils/constants';
import { calculateNumberOfPages } from '../utils/helperFunctions';

const { getPublications } = publicationsActionCreators;

const Table = styled.table({});
const THead = styled.thead({});
const TBody = styled.tbody({});
const Tr = styled.tr({
  textTransform: 'capitalize'
});
const Th = styled.th({});
const Td = styled.td({});
const Div = styled.div({});

const Button = styled.button({
  marginLeft: '3px',
  marginRight: '3px'
});

const SortContainer = styled.div({
  flexGrow: 1
});
const Input = styled.input({
  width: '15rem'
});

let counter = 0;

const Nav = styled.nav({
  margin: 0,
  height: '3.8rem',
  display: 'flex',
  minWidth: '30rem',
});

const Ul = styled.ul({
  justifyContent: 'center'
});

function Main(props) {
  return (
    <React.Fragment>
        <Div className="table-responsive">
          <Nav className="navbar navbar-light bg-light">
            <SortContainer>
              <Button
                onClick={() => props.getPublications(0, 'DESC', SORT)}
                className="btn btn-default" >
                  Oldest - Newest
              </Button>
              <Button
                onClick={() => props.getPublications(0, 'ASC', SORT)}
                className="btn btn-default">
                  Newest - Oldest
              </Button>
            </SortContainer>
            <Input
              onChange={(e) => props.getPublications(0, e.target.value, SEARCH)}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"/>
          </Nav>
          {props.isFetching ?
            <Div>
              Fetching publications...
            </Div>
          :
          props.publications.length ?
          <Table className="table">
            <THead>
              <Tr>
                <Th scope="col">#</Th>
                <Th scope="col">Title</Th>
                <Th scope="col">Author</Th>
                <Th scope="col">Date</Th>
                <Th scope="col">Read </Th>
              </Tr>
            </THead>
            <TBody>
            {
              props.publications.map((publication, index) =>
                <Tr key={counter++}>
                  <Th scope="row">{index+1}</Th>
                  <Td>{publication.title}</Td>
                  <Td>{`${publication.author.firstName} ${publication.author.lastName}`}</Td>
                  <Td>{publication.createdAt}</Td>
                  <Td>
                    <Button
                      onClick={() => props.toggleModal(true, publication.body)}
                      className="btn btn-default">
                      View
                    </Button>
                  </Td>
                </Tr>
              )
            }
            </TBody>
          </Table>
          :
          <Div>
            No publications at this time
          </Div>}
          {!props.isFetching ? <nav aria-label="Page navigation example">
            <Ul className="pagination">
              {calculateNumberOfPages(props.numberOfPublications).map((page) =>
                <li
                  onClick={() => props.getPublications(page)}
                  className="page-item" key={page}>
                  <span className="page-link">
                    {page+1}
                  </span>
              </li>)}
            </Ul>
          </nav> : ''}
        </Div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  publications: state.publications.publications,
  isFetching: state.publications.isFetching,
  numberOfPublications: state.publications.numberOfPublications
});

const mapDispatchToProps = {
  getPublications,
  toggleModal: toggleModal
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
