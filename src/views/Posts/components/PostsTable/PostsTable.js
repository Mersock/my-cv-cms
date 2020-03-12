import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../../../actions/Posts';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PostsTable = props => {
  const { className, posts, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleNextPageChange = page => {
    const nextPage = page + 1;
    dispatch(getPosts({ page: nextPage, limit: rowsPerPage }));
  };

  const handleBackPageChange = page => {
    const nextPage = page - 1;
    dispatch(getPosts({ page: nextPage, limit: rowsPerPage }));
  };

  const handleRowsPerPageChange = event => {
    dispatch(getPosts({ limit: event.target.value }));
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    setCount(posts.meta.dataTotal || count);
    setPage(posts.meta.currentPage || page);
    setRowsPerPage(posts.meta.perPage || rowsPerPage);
  }, [
    count,
    page,
    posts.meta.currentPage,
    posts.meta.dataTotal,
    posts.meta.perPage,
    rowsPerPage
  ]);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                  <TableCell>Slug</TableCell>
                  <TableCell>Create date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.data &&
                  posts.data.map(post => (
                    <TableRow className={classes.tableRow} hover key={post.id}>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          {post.title}
                        </div>
                      </TableCell>
                      <TableCell><span dangerouslySetInnerHTML={{__html: post.body.slice(0,100)}} /></TableCell>
                      <TableCell>{post.slug}</TableCell>
                      <TableCell>
                        {moment(post.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={count}
          onChangePage={handlePageChange}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
            onClick: () => handleNextPageChange(page)
          }}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
            onClick: () => handleBackPageChange(page)
          }}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

PostsTable.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.object.isRequired
};

export default PostsTable;
