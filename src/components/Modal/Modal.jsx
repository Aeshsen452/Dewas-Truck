
import { Modal } from 'antd';
import TripCard from '../../features/Trip/component/tripCard';

const useModal = () => {

    const [modal, contextHolder] = Modal.useModal();
    const handleClick = (data) => {
        const modalConfig = {
            content: <TripCard data={data} />
        };
        modal.confirm({ ...modalConfig, mask: { blur: true }, width:"100%" });
    }
    return {
        contextHolder,
        handleClick
    }
};
export default useModal;