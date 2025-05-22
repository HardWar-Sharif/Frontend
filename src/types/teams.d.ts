declare interface CreateTeam {
  name: string;
}

declare interface TeamMember {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  persian_first_name: string;
  persian_last_name: string;
  university_name: string;
  department_name: string;
}

declare interface Component {
  id: number;
  name: string;
  image_url: string;
  count: number;
  credit_cost: number;
}

declare interface PurchaseComponent {
  component_id: number;
  quantity: number;
}
