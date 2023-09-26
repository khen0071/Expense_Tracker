import { apiSlice } from "../apiSlice";
const EXPENSE_URL = "/api/expenses";

export const expenseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpense: builder.query({
      query: () => ({
        url: `${EXPENSE_URL}`,
      }),
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      keepUnusedDataFor: 5,
      providesTags: ["Expenses"],
    }),
    addExpense: builder.mutation({
      query: (expense) => ({
        url: `${EXPENSE_URL}`,
        method: "POST",
        body: expense,
      }),
      invalidatesTags: ["Expenses"],
    }),
    updateExpense: builder.mutation({
      query: (expense) => ({
        url: `${EXPENSE_URL}/expenses/${expense.id}`,
        method: "PATCH",
        body: expense,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: ({ id }) => ({
        url: `${EXPENSE_URL}/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetExpenseQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseSlice;
