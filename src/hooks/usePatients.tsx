import { useClients } from "./useClients";
import { useCallback } from "react";

export function usePatients() {
  const { getClientById } = useClients();

  const getAllPatientsByClientId = useCallback(
    async (clientId: string) => {
      console.log("Getting patients for client:", clientId);
      const clientData = await getClientById(clientId);

      // Перевіряємо наявність даних та масиву пацієнтів
      if (!clientData?.patients) {
        console.log("No patients found for client");
        return [];
      }

      const patients = clientData.patients.map(
        (patient: string, index: number) => ({
          label: patient,
          value: index.toString(), // Конвертуємо в рядок для консистентності
        })
      );

      return patients;
    },
    [getClientById]
  );

  return { getAllPatientsByClientId };
}
