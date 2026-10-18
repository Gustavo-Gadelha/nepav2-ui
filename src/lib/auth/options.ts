// Opções provisórias (mock) dos selects do cadastro, até existir a API.

export type Option = { value: string; label: string };

export const userTypes: Option[] = [
  { value: "aluno", label: "Aluno" },
  { value: "professor", label: "Professor" },
  { value: "pesquisador", label: "Pesquisador externo" },
];

export const courses: Option[] = [
  { value: "administracao", label: "Administração" },
  { value: "ciencias-contabeis", label: "Ciências Contábeis" },
  { value: "direito", label: "Direito" },
  { value: "enfermagem", label: "Enfermagem" },
  { value: "engenharia-civil", label: "Engenharia Civil" },
  { value: "fisioterapia", label: "Fisioterapia" },
  { value: "medicina", label: "Medicina" },
  { value: "psicologia", label: "Psicologia" },
];
