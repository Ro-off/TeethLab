import { useClients } from "./useClients";

export function usePatients() {
  const { getClientById } = useClients();

  async function getAllPatientsByClientId(clientId: string) {
    const clientData = await getClientById(clientId);
    const patients = clientData
      ? clientData.patients.map((patient: string, index: number) => ({
          label: patient,
          value: index,
        }))
      : [];
    return patients;
  }
  return { getAllPatientsByClientId };
}
