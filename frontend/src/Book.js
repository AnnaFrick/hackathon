import Button from './Button';
import Scheduel from './Scheduel';
import DropDownWithCheckboxes from './DropDownCheckboxes';

const Book = () => {
    return (
        <div>
            <h2>Välj en tid</h2>
            <DropDownWithCheckboxes />
            <Scheduel />
            <Button text="Nästa" />
        </div>
    );
}

export default Book;