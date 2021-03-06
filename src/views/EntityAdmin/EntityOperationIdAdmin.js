import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import GridContainer from 'components/defaultComponents/Grid/GridContainer';
import GridItem from 'components/defaultComponents/Grid/GridItem';
import {Card} from '@material-ui/core';
import Show from './Show';
import Edit from './Edit';

const {REACT_APP_SERVER_URL} = process.env;

export default function IdOperationEntityAdmin(props) {
  const {operation, id, query} = props.match.params;

  const [data, setData] = useState(null);

  const getInformation = async () => {
    try {
      const jwt = localStorage.getItem('session');
      const authConfig = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get(
        `${REACT_APP_SERVER_URL}/${query.replaceAll('-', '/')}/${id}`,
        authConfig,
      );
      setData(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem('session');
        window.location.href = '/';
      }
    
    }
  };

  useEffect(() => {
    getInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOperation = () => {
    const operations = {
      show: function () {
        return <Show data={data} />;
      },
      edit: function () {
        return (
          <Edit
            {...props}
            dataEdit={data}
            queryEdit={`${data.entityName}/admin/edit/${id}`}
          />
        );
      },
    };
    if (typeof operations[operation] !== 'function')
      throw new Error('Invalid type');
    return operations[operation]();
  };

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          {data && Object.keys(data).length > 0 ? getOperation() : null}
        </Card>
      </GridItem>
    </GridContainer>
  );
}

IdOperationEntityAdmin.propTypes = {
  match: PropTypes.any,
};
