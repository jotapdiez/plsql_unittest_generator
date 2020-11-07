import { UnitTest, TABLE_OR_ROW_COPY, PLSQL_CODE, TABLE_DROP, TABLE_OR_ROW_RESTORE, QUERY_RETURN_NO_ROWS, QUERY_RETURN_ROWS, BOOLEAN_FUNCTION, COMPARE_QUERY, COMPARE_TABLES } from './constants';
import { v4 as uuidv4 } from 'uuid';
/*
el object_id del tag <arg ser deberia sacar de select object_name, object_id from user_objects where OBJECT_TYPE='PACKAGE';
*/
const XmlGenerator = (unitTest: UnitTest) => {
    console.log('unitTest: ', unitTest);
    const testId = unitTest.id; //uuidv4()
    const testImplId = uuidv4();
    const args = unitTest.parameters.map((param, index) => {
        return `<arg id="${param.id}" owner="${unitTest.owner}" object_name="${unitTest.procedure}" package_name="${unitTest.pkg}" object_id="1" argument_name="${param.parameter}" position="${index}" sequence="${index}" data_level="0" data_type="${param.dataType}" in_out="${param.inout}" data_length="22" radix="10" pls_type="${param.dataType}" char_length="0" char_used="0"/>`;
    });
    const params = unitTest.parameters.map((param, index) => {
        return `<parm argId="${param.id}" utiId="${testImplId}" input_value="&lt;?xml version = '1.0' encoding = 'UTF-8'?>&#xD;&#xA;&lt;DataValue name=&quot;${param.parameter}&quot;>1&lt;/DataValue>" test_out_val="${param.testResult}"/>`;
    });

    const startups = unitTest.startups.map(startup => {
        const javaClass = (startup.id === TABLE_OR_ROW_COPY.id ? 'TableCopyStartup' : 'PlSqlStartup');
        return (`<startup id="${startup.id}">
            <startup>
                <class>oracle.dbtools.unit_test.startup.${javaClass}</class>
                <name>User PL/Sql Code</name>
                <description>${startup.label}</description>
                <code>${startup.content}</code>
            </startup>
        </startup>`
        );
    });
    const teardowns = unitTest.teardowns.map(teardown => {
        let javaClass = '';
        if (teardown.optionId === PLSQL_CODE.id) {
            javaClass = 'PlSqlTeardown';
        } else if (teardown.optionId === TABLE_DROP.id) {
            javaClass = 'TableDropTeardown';
        } else if (teardown.optionId === TABLE_OR_ROW_RESTORE.id) {
            javaClass = 'TableRestoreTeardown';
        }

        return (`<teardown id="${teardown.id}">
            <teardown>
                <class>oracle.dbtools.unit_test.teardown.${javaClass}</class>
                <name>User PL/Sql Code</name>
                <description>${teardown.label}</description>
                <code>${teardown.content}</code>
            </teardown>
        </teardown>`
        );
    });
    const validations = unitTest.validations.map(validation => {
        let javaClass = '';
        if (validation.optionId === COMPARE_QUERY.id) {
            javaClass = 'ResultSetCompare';
        } else if (validation.optionId === COMPARE_TABLES.id) {
            javaClass = 'TableCompare';
        } else if (validation.optionId === QUERY_RETURN_NO_ROWS.id) {
            javaClass = 'QueryReturningNoRows';
        } else if (validation.optionId === QUERY_RETURN_ROWS.id) {
            javaClass = 'QueryReturningRows';
        } else if (validation.optionId === BOOLEAN_FUNCTION.id) {
            javaClass = 'BooleanFunction';
        } else if (validation.optionId === PLSQL_CODE.id) {
            javaClass = 'PlSqlValidation';
        }

        return (` <validation id="${validation.id}" apply="true">
            <validation>
                <class>oracle.dbtools.unit_test.process_validation.${javaClass}</class>
                <name>Compare Query Results</name>
                <description>${validation.label}</description>
                <source>${validation.content}</source>
                <target>${validation.contentTarget}</target>
            </validation>
        </validation>`
        );
    });
    return `<?xml version = '1.0' encoding = 'UTF-8'?>
<UT>
    <object class="oracle.dbtools.unit_test.testObjects.UtTest">
        <test id="${testId}" name="${unitTest.nombre}" obj_name="${unitTest.pkg}" obj_owner="${unitTest.owner}" obj_type="${unitTest.objType}" obj_call="${unitTest.procedure}" src_conn_name="IdeConnections%23EstCajEd%40MUGISD" coverage="${unitTest.gatherStatistics}">
            ${args}
            ${startups}
            ${teardowns}
            <test_impl id="${testImplId}" test_id="${testId}" name="Single" expected_ret="${unitTest.expectedResult}" expected_err="ANY">
            ${params}
            ${validations}
            </test_impl>
        </test>
    </object>
</UT>`
    ;
};

export default XmlGenerator;