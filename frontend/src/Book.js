import Button from './Button';
import Scheduel from './Scheduel';
import DropDown from './DropDown';

const Book = () => {
    return (
        <div>
            <h2>Välj en tid</h2>
            <DropDown />
            <Scheduel />
            <Button text="Nästa" />
        </div>
    );
}

export default Book;