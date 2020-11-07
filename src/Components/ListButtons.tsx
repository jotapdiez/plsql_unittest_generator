import React from 'react';
import { Button } from 'semantic-ui-react';
import './ListButtons.css';

type ListButtonProps = {
    onNew: () => void;
}

function ListButtons({ onNew}:ListButtonProps) {
    return (
        <div className="ListButtons">
            <Button variant="link" onClick={onNew} icon='plus' />
            <Button variant="link" icon='angle double up' />
            <Button variant="link" icon='angle up' />
            <Button variant="link" icon='angle double down' />
            <Button variant="link" icon='angle double down' />
            <Button variant="link" icon='close' />
        </div>
    );
}

export default ListButtons;
