import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SelectingDriver } from '../state/dash.Slice';

const SelectComponent = ({ data }) => {

    const dispatch = useDispatch();
    const { selectedDriver } = useSelector((state) => state.dash);

    const options = data.map((item) => ({
        value: item.driverName,
        label: item.driverName,
    }));

    const handleChange = value => {
        dispatch(SelectingDriver(value))
    };


    return (
        <Select
            style={{ width: '100%' }}
            showSearch
            onChange={handleChange}
            options={options}
        />
    )
}

export default SelectComponent



