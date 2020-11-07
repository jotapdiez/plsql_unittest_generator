import { v4 as uuidv4 } from 'uuid';

export type Item = {
  id: string;
  setId?: any;
  label: string;
  setLabel?: any;
  optionId: string;
  setOptionId?: any;
  content: string;
  setContent?: any;
  contentTarget?: string;
  setContentTarget?: any;
}

export type Params = {
  id: string;
  setId?: any;
  parameter: string;
  setParameter?: any;
  dataType: string;
  setDataType?: any;
  inout: string;
  setInout?: any;
  input: string;
  setInput?: any;
  testResult: boolean;
  setTestResult?: any;
  enabled: boolean;
  setEnabled?: any;
}

export interface UnitTest {
  id: string;
  setId?: any;
  nombre: string;
  setNombre?: any;
  owner: string;
  setOwner?: any;
  pkg: string;
  setPackage?: any;
  procedure: string;
  setProcedure?: any;
  expectedResult: string;
  setExpectedResult?: any;
  gatherStatistics: boolean;
  setGatherStatistics?: any;
  objType: string;
  setObjType?: any;
  startups: Item[];
  setStartups?: any;
  teardowns: Item[];
  setTeardowns?: any;
  validations: Item[];
  setValidations?: any;
  parameters: Params[];
  setParameters?: any;
}

export const DefaultParams: Params = {
  id: uuidv4(),
  parameter: '',
  dataType: '',
  inout: '',
  input: '',
  testResult: false,
  enabled: true,
}

export type Option = {
  id: string;
  setId?: any;
  label: string;
  setLabel?: any;
  defaultContent: string;
  defaultContentTarget: string;
}


export const TABLE_OR_ROW_COPY:Option = {
  id: 'tableOrRowCopy',
  label: 'Table or Row Copy',
  defaultContent: '',
  defaultContentTarget: ''
}
export const TABLE_OR_ROW_RESTORE:Option = {
  id: 'tableOrRowRestore',
  label: 'Table or Row Restore',
  defaultContent: '',
  defaultContentTarget: ''
}
export const PLSQL_CODE:Option = {
  id: 'plsql',
  label: 'User PL/SQL Code',
  defaultContent: '',
  defaultContentTarget: ''
}
export const TABLE_DROP:Option = {
  id: 'tableDrop',
  label: 'Table Drop',
  defaultContent: '',
  defaultContentTarget: ''
}
export const BOOLEAN_FUNCTION :Option= {
  id: 'booleanFunc',
  label: 'Boolean Function',
  defaultContent: `DECLARE
    l_count NUMBER;
BEGIN
    SELECT count(*) INTO l_count FROM dual;
    IF l_count <> 0
    THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;`,
  defaultContentTarget: ''
}
export const COMPARE_TABLES:Option = {
  id: 'compareTables',
  label: 'Compare Tables',
  defaultContent: '',
  defaultContentTarget: ''
}
export const COMPARE_QUERY:Option = {
  id: 'compareQuery',
  label: 'Compare Query Result',
  defaultContent: 'SELECT COUNT(1) RES FROM XXX',
  defaultContentTarget: 'SELECT 1 RES FROM DUAL'
}
export const QUERY_RETURN_ROWS:Option = {
  id: 'queryReturnRows',
  label: 'Query Return Rows',
  defaultContent: 'SELECT * FROM DUAL',
  defaultContentTarget: ''
}
export const QUERY_RETURN_NO_ROWS:Option = {
  id: 'queryReturnNoRows',
  label: 'Query Return No Rows',
  defaultContent: 'SELECT NULL FROM DUAL',
  defaultContentTarget: ''
}

export const options = [
  TABLE_OR_ROW_COPY,
  TABLE_OR_ROW_RESTORE,
  PLSQL_CODE,
  TABLE_DROP,
  BOOLEAN_FUNCTION,
  COMPARE_TABLES,
  COMPARE_QUERY,
  QUERY_RETURN_ROWS,
  QUERY_RETURN_NO_ROWS
];