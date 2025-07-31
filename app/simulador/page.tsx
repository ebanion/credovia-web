'use client';

import { useForm } from 'react-hook-form';

export default function SimuladorPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Formulario enviado:', data);
    alert(`Datos recibidos:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Simulador de Financiación</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            {...register('nombre', { required: 'El nombre es obligatorio' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Introduce tu nombre"
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs italic">
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Importe a financiar (€)
          </label>
          <input
            type="number"
            {...register('importe', {
              required: 'Este campo es obligatorio',
              min: { value: 1000, message: 'Mínimo 1000 €' },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ej. 10000"
          />
          {errors.importe && (
            <p className="text-red-500 text-xs italic">
              {errors.importe.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Plazo (meses)
          </label>
          <input
            type="number"
            {...register('plazo', {
              required: 'Indica el número de meses',
              min: { value: 6, message: 'Mínimo 6 meses' },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ej. 36"
          />
          {errors.plazo && (
            <p className="text-red-500 text-xs italic">
              {errors.plazo.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Calcular
          </button>
        </div>
      </form>
    </main>
  );
}
