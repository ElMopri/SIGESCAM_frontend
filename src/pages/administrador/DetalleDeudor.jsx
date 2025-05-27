import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/por_cobrar/ModalDetalleDeuda.css';
import ModalDetalleDeuda from '../../components/por_cobrar/ModalDetalleDeuda';
import { obtenerDeudorPorDNI } from '../../api/DeudorApi';


const DetalleDeudor = ({ onClose, onGuardar }) => {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  const [deudor, setDeudor] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [clienteIdSeleccionado, setClienteIdSeleccionado] = useState(null);

  useEffect(() => {
    const fetchDeudor = async () => {
      try {
        const data = await obtenerDeudorPorDNI(clienteId);
        if (!data) {
          console.warn("No se encontró deudor con ese DNI");
          return;
        }
        setDeudor(data.deudor);
        setDetalles(data.detalles || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Error cargando detalles del deudor:', error);
      }
    };

    if (clienteId) fetchDeudor();
  }, [clienteId]);

  const handleRegistrarClick = (clienteId) => {
    setClienteIdSeleccionado(clienteId);
    setMostrarModal(true);
  };

  return (
    <div className="modal-detalle-deudor-overlay">
      <label className="ventas-fiadas">Ventas Fiadas</label>
      <div className="modal-deuda">
        <div className="modal-header">
          <div>
            <p><strong>Nombre:</strong> {deudor?.nombre || '---'}</p>
            <p><strong>Documento:</strong> {deudor?.documento || '---'}</p>
            <p className="fecha-actual-detalle-deuda">
              <strong>Fecha:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="modal-header-right-detalle-deuda">
            <span className="close-button-detalle-deuda" onClick={() => {navigate('/admin/por-cobrar');}}>&times;</span>
          </div>
        </div>

        <div className="modal-title">Detalle de Ventas Fiadas</div>

        <table className="tabla-deuda">
          <thead>
            <tr>
              <th>Venta</th>
              <th>Monto pendiente</th>
              <th>Fecha</th>
              <th>Registrar Abono</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'fila-par-detalle-deuda' : 'fila-impar-detalle-deuda'}
              >
                <td>Venta {index + 1}</td>
                <td>${parseFloat(item.valor).toFixed(2)}</td>
                <td>{item.fecha}</td>
                <td>
                  <button
                    className="btn-abono"
                    onClick={() => handleRegistrarClick(index)}
                  >
                    Registrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mostrarModal && (
        <DetalleDeudor
          onClose={() => setMostrarModal(false)}
        />
      )}
      </div>
    </div>
  );
};

export default DetalleDeudor;
