import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { Box, Code, Heading, chakra, Text, TableHeader, TableBody, TableRow, TableCell, TableRoot, TableColumnHeader, List, Link, Flex, Stack } from "@chakra-ui/react";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import { useEffect, useState } from 'react';



// Defined Interfaces
interface TextProps {
  node?: any;
  children?: React.ReactNode;
  strong?: boolean;
  emphasis?: boolean;
}

interface LinkProps {
  node?: any;
  href?: string;
  children?: React.ReactNode;
}

// Defined Components
const ListContext = React.createContext(0);
  
const ListWrapper = ({ children, ordered }: { children: React.ReactNode, ordered?: boolean }) => {
  const depth = React.useContext(ListContext);
  
  return (
    <List.Root 
      as={ordered ? 'ol' : 'ul'}
      ps={depth * 5}
    >
      <ListContext.Provider value={depth + 1}>
        {children}
      </ListContext.Provider>
    </List.Root>
  );
};

const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <List.Item> {children} </List.Item>
  );
};

const Pre = chakra("pre", {
  base: {
    whiteSpace: "pre-wrap", // Preserve whitespace and wrap lines
    w: "100%",              // Full width of parent
    overflowX: "auto",      // Horizontal scroll if needed
    fontFamily: "monospace",
    "& > code": {
      display: "block",    // Make code a block-level element
      w: "100%",           // Ensure full width inside <pre>
    },
  },
});

const CustomCode = ({className, children, ...props}: {className: string | undefined, children: React.ReactNode}) => {
  const match = /language-(\w+)/.exec(className || "");
  if (match) {
    return (
      <SyntaxHighlighter
        style={oneDark}
        language={match ? match[1] : "text"} 
        PreTag="div"
        customStyle={{
          borderRadius: "8px",
          marginTop: "8px",
          marginBottom: "8px",
          overflowX: "auto",
        } as React.CSSProperties} // Ensure correct typing
        {...props}
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    );
  }
  return <Code {...props} >{children}</Code>;
}



const MarkdownFile = ({ filePath }: { filePath: string }) => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.text())
      .then(setMarkdown)
      .catch((err) => console.error("Failed to load markdown:", err));
  }, [filePath]);

  return (
    <div dir="rtl">
      <Box p={4}>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ node, ...props }) => <Text my={3} {...props} />,
            h1: ({ node, ...props }) => <Heading as="h1" size="2xl" my={4} {...props} />,
            h2: ({ node, ...props }) => <Heading as="h2" size="xl" my={4} {...props} />,
            h3: ({ node, ...props }) => <Heading as="h3" size="lg" my={4} {...props} />,
            h4: ({ node, ...props }) => <Heading as="h4" size="md" my={4} {...props} />,

            span: ({ node, ...props }) => (<span dir="ltr" {...props}></span>),
            code: ({node, className, children, ...props}) => (<CustomCode className={className} {...props}>{children}</CustomCode>),
            pre: ({ node, ...props }) => (<Pre dir="ltr" {...props} ></Pre>),

            table: ({ node, ...props }) => <TableRoot my={4} variant="outline" showColumnBorder {...props} />,
            thead: ({ node, ...props }) => <TableHeader {...props} />,
            tbody: ({ node, ...props }) => <TableBody {...props} />,
            tr: ({ node, ...props }) => <TableRow {...props} />,
            th: ({ node, ...props }) => <TableColumnHeader {...props} />,
            td: ({ node, ...props }) => <TableCell {...props} />,

            ul: ({ node, children, ...props }) => <ListWrapper {...props}>{children}</ListWrapper>,
            ol: ({ node, children, ...props }) => <ListWrapper ordered {...props}>{children}</ListWrapper>,
            li: ({ node, children, ...props }) => <ListItem {...props}>{children}</ListItem>,

            strong: ({ node, children, ...props }: TextProps) => <Text as="span" fontWeight="bold" {...props}>{children}</Text>,
            em: ({ node, children, ...props }: TextProps) => <Text as="span" fontStyle="italic" {...props}>{children}</Text>,
            a: ({ node, href, children, ...props }: LinkProps) => <Link href={href} {...props}>{children}</Link>,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </Box>
    </div>
  );
};

const QuestionsPage = () => {
  const questions = [
    {"file path": "/questions/q1.md", "question name": "random name 1"},
    {"file path": "/questions/q2.md", "question name": "random name 2"},
    {"file path": "/questions/q3.md", "question name": "random name 3"},
  ];

  const [filename, setFilename] = useState<string>('/questions/q1.md');

  return (
    <Flex justify="flex-end" padding="100px 0 2% 5%">
      <Box w="75%" marginRight="20%"><MarkdownFile filePath={filename} /></Box>

      <Box minW="20%" dir="rtl" position="fixed">
        <Stack padding={5}>
        {questions.map((q) => (
          <Box
            key={q["file path"]}
            p={2}
            cursor="pointer"
            borderRadius="lg"
            bg="colorPalette.950"
            _hover={{ bg: 'colorPalette.900' }}
            onClick={() => setFilename(q["file path"])}
          >
            {q["question name"]}
          </Box>
        ))}
        </Stack>
      </Box>
    </Flex>
  );
}

export default QuestionsPage;