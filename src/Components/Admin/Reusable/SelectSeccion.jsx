import React, { useEffect } from 'react'

const SelectSeccion = ({seccion, data, handleChangeSl,handleBlur, form}) => {




  return (
    <select name={"cbo"+seccion} id={"cbo"+seccion} value={form || "0"} onChange={handleChangeSl} onBlur={handleBlur}>
              <option value="0">Seleccione una opción</option>
        {
          data.length != 0 && (
            
          data.map((item) => {
            return <option key={item.id} value={item.id}>{item.nombre || item.nombreProveedor}</option>
          }))
        }


    </select>
  )
}

export default SelectSeccion