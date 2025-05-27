import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../components/por_cobrar/ModalDetalleDeuda.css';

const DetalleDeudor = ({ onClose, onGuardar }) => {
  const { clienteId } = useParams(); // Obtener ID de la URL
  const [deudor, setDeudor] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Simulación de carga desde una API o fuente de datos
    const fetchDeudor = async () => {
      try {
        // Aquí simulas una petición al backend:
        const response = await fetch(`/api/deudores/${clienteId}`);
        const data = await response.json();

        setDeudor(data.deudor);
        setDetalles(data.detalles);
        setTotal(data.total);
      } catch (error) {
        console.error('Error cargando detalles del deudor:', error);
      }
    };

    if (clienteId) fetchDeudor();
  }, [clienteId]);

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
            <span className="close-button-detalle-deuda" onClick={onClose}>&times;</span>
          </div>
        </div>

        <div className="modal-title">Detalle de la Deuda</div>

        <table className="tabla-deuda">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'fila-par-detalle-deuda' : 'fila-impar-detalle-deuda'}
              >
                <td>{item.fecha}</td>
                <td>{item.concepto}</td>
                <td>${parseFloat(item.valor).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal-total">
          <label>Total Adeudado:</label>
          <input
            type="text"
            value={`$${parseFloat(total || 0).toFixed(2)}`}
            readOnly
          />
        </div>

        <button className="btn-guardar" onClick={onGuardar}>Guardar</button>
      </div>
    </div>
  );
};

export default DetalleDeudor;
