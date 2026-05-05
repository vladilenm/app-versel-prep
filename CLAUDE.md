# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. 

## Project

Personal budget tracker SPA — income/expense tracking with category breakdown and charts. No backend; all data persists in localStorage.

## Tech Stack

- React 19 + TypeScript, Vite, Tailwind CSS 4, Recharts, uuid

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint

## Architecture

- Two-tab SPA: Dashboard (balance + charts) and Transactions (list + add form)
- Data layer: custom hook (`useTransactions`) wrapping localStorage with auto-save
- Data model: `Transaction { id, amount, type: "income"|"expense", category, date, description? }`
- Predefined categories — no custom category creation
- Charts: PieChart (expenses by category per month), BarChart (income vs expenses last 6 months)

## Conventions

- Language: Russian UI, English code identifiers
- Colors: green for income, red for expenses
- Responsive: mobile-first with Tailwind
