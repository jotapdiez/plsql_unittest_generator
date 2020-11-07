import React, { useContext} from 'react';
import './styles.css';
import { PLSQL_CODE, BOOLEAN_FUNCTION, COMPARE_TABLES, QUERY_RETURN_ROWS, QUERY_RETURN_NO_ROWS, COMPARE_QUERY } from '../constants';
import { ItemList } from '../Components/ItemList';
import { UnitTestContext } from '../context/UnitTestContext';
import { Container } from 'semantic-ui-react'

function Validations() {
    const { validations, setValidations } = useContext(UnitTestContext);
    return (
        <Container fluid>
            <ItemList options={[BOOLEAN_FUNCTION, COMPARE_TABLES, QUERY_RETURN_ROWS, QUERY_RETURN_NO_ROWS, PLSQL_CODE, COMPARE_QUERY]} items={validations} setmethod={setValidations}/>
        </Container>
    );
}

export default Validations;
