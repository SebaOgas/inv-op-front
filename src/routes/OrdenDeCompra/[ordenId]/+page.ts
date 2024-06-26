
    import { OrdenDeCompraService } from '../OrdenDeCompraService';

    export const load = async ({ params }) => {
        return {
            purchaseOrderId: params.ordenId,
            purchaseOrder: await OrdenDeCompraService.purchaseOrder.get(params.ordenId)
        }
    }