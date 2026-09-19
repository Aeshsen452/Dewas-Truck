import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { SelectingDriver } from '../state/dash.Slice';

const SelectComponent = ({ data }) => {

    const dispatch = useDispatch();

    const options = data.map((item) => ({
        value: item.driverName,
        label: item.driverName,
    }));

    const handleChange = value => {
        dispatch(SelectingDriver(value))
    };


    return (
        <Select
            showSearch
            onChange={handleChange}
            options={options}
            placeholder="Select an option"
            className="w-full"
        />
    )
}

export default SelectComponent



