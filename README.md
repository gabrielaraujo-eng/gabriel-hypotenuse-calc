# Calculadora de Hipotenusa

Aplicação web interativa para calcular a hipotenusa de um triângulo retângulo usando uma fórmula personalizada, com opção de cálculo automático ou entrada manual do coeficiente.

## Tecnologias

- React
- TypeScript
- Vite
- CSS3 com tema escuro

## Executar localmente

```bash
git clone https://github.com/gabrielaraujo-eng/gabriel-hypotenuse-calc.git
cd gabriel-hypotenuse-calc
pnpm install
pnpm run dev
```

Para validar o build de produção:

```bash
pnpm run build
```

## GitHub Pages

O workflow em `.github/workflows/pages.yml` já está pronto para fazer o build e publicar a pasta `dist`. Para ativar a publicação pela primeira vez, abra **Settings → Pages** no repositório e selecione **GitHub Actions** como fonte. Depois disso, cada push na branch `main` fará o deploy automaticamente.

URL esperada: <https://gabrielaraujo-eng.github.io/gabriel-hypotenuse-calc/>

## Fórmula

A aplicação usa `C = K × B + A`, com cálculo automático de `K` a partir dos catetos informados.

## Créditos

Desenvolvido por Gabriel Lúcio de Araújo.
