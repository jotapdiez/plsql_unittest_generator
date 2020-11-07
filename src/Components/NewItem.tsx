import React, { useContext, useEffect } from 'react'
import { Option,
    TABLE_OR_ROW_COPY,
    TABLE_OR_ROW_RESTORE,
    PLSQL_CODE,
    TABLE_DROP,
    BOOLEAN_FUNCTION,
    COMPARE_TABLES,
    COMPARE_QUERY,
    QUERY_RETURN_ROWS,
    QUERY_RETURN_NO_ROWS
} from '../constants'
import { ItemContext } from '../context/ItemTestContext'
import { Form,Grid,Input,Select } from 'semantic-ui-react'
import SQLEditor from './SQLEditor'

export type NewItemProps = {
    options: Option[];
}

const tipos = [TABLE_OR_ROW_COPY,
    TABLE_OR_ROW_RESTORE,
    PLSQL_CODE,
    TABLE_DROP,
    BOOLEAN_FUNCTION,
    COMPARE_TABLES,
    COMPARE_QUERY,
    QUERY_RETURN_ROWS,
    QUERY_RETURN_NO_ROWS];
export const NewItem = ({ options }: NewItemProps) => {
    const { id, label, setLabel, optionId, setOptionId, content, setContent, contentTarget, setContentTarget } = useContext(ItemContext);

    useEffect(() => {
        const tipo = tipos.filter(v =>v.id === optionId)[0];
        if (content === ''){
            setContent(tipo.defaultContent);
        }
        if (contentTarget === '') {
            setContentTarget(tipo.defaultContentTarget);
        }
    }, [optionId]);

    return (<>
        <Form>
            <Form.Group>
                <Form.Field
                    control={Select}
                    label='Type'
                    options={options.map((o, index) => { return { key: index, text: o.label, value: o.id } })}
                    placeholder=''
                    value={optionId}
                    width={3}
                    onChange={(e: any, data: any) => setOptionId(data.value)}
                />
                <Form.Field
                    control={Input}
                    label='Nombre'
                    placeholder=''
                    value={label}
                    width={6}
                    onChange={(e: any) => setLabel(e.target.value)}
                />
            </Form.Group>
        </Form>
        <Grid>
            <Grid.Row>
                <Grid.Column width={(optionId === COMPARE_TABLES.id || optionId === COMPARE_QUERY.id ? 8 : 16)}>
                    <SQLEditor id={id} content={content} />
                </Grid.Column>
                {optionId === COMPARE_TABLES.id || optionId === COMPARE_QUERY.id ? (<Grid.Column width={8}>
                    <SQLEditor id={id} content={contentTarget || ''} />
                </Grid.Column>) : null}
            </Grid.Row>
        </Grid>
    </>);
}
