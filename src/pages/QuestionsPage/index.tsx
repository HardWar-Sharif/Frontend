import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { Box, Code, Heading, chakra, Text, TableHeader, TableBody, TableRow, TableCell, TableRoot, TableColumnHeader, List, Link, Flex, Image, Stack } from "@chakra-ui/react";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import { useEffect, useState } from 'react';
import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGetQuestions } from "@/hooks/get-questions";
import { useGetQuestion } from "@/hooks/get-question";



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

interface ImageProps {
  node?: any;
  src?: string;
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


export const MarkdownViewer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ node, ...props }) => <Text my={3} {...props} />,
        h1: ({ node, ...props }) => <Heading as="h1" color="colorPalette.200" size="2xl" my={4} {...props} />,
        h2: ({ node, ...props }) => <Heading as="h2" color="colorPalette.100" size="xl" my={4} {...props} />,
        h3: ({ node, ...props }) => <Heading as="h3" color="colorPalette.100" size="lg" my={4} {...props} />,
        h4: ({ node, ...props }) => <Heading as="h4" color="white" size="md" my={4} {...props} />,

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
        img: ({ node, src, ...props }: ImageProps) => <Flex justify="center"> <Image src={src} {...props} /> </Flex>
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};



const MarkdownFile = ({ filePath }: { filePath: number }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const {mutate} = useGetQuestion(filePath);

  useEffect(() => {
    console.log('mutate is ' + mutate);
    mutate(undefined, {
      onSuccess: (data) => {
        setMarkdown(data.content);
        setTitle(data.title);
      },
      onError: (err) => {
        setMarkdown('Failed to load the question');
        console.log(err);
      },
    });
  }, [filePath, mutate]);

  return (
    <div dir="rtl">
      <Box p={4}>
        <Heading size="4xl" color="colorPalette.300">{title}</Heading>
        <MarkdownViewer markdown={markdown} />
      </Box>
    </div>
  );
};

const QuestionsPage = () => {
  const [viewQuestion, setViewQuestions] = useState<boolean>(false);

  const questions = [
    {id: "1", name: "random name 1", x: 0, y: 0},
    {id: "2", name: "random name 2", x: 100, y: 100},
    {id: "3", name: "random name 3", x: 30, y: 200},
    
  ];

  // const graphExtent: [[number, number], [number, number]] = [
  //   [-100, -100],           // Top-left corner (min x, min y)
  //   [1000, 1000],     // Bottom-right corner (max x, max y) - adjust based on your graph size
  // ];

  const edges = [
    { id: '1-2', source: '1', target: '2', style: { stroke: '#991919' } },
    { id: '1-3', source: '1', target: '3', style: { stroke: '#991919' } },
    // { id: '2-3', source: '2', target: '3', style: { stroke: '#991919' } },
  ];

  const { data, isLoading } = useGetQuestions();
  const [all_questions, setQuestions] = useState<number[]>([]);
  useEffect(() => {
    if (data)
      setQuestions(JSON.parse(data.questions));
    else
      setQuestions([])
  }, [data, isLoading])
   
  const nodes = questions.map((node) => ({
    id: node.id,
    data: { 
      label: node.name,
      disabled: !all_questions.includes(parseInt(node.id)),
    },
    position: { 
      x: node.x, 
      y: node.y 
    },
    // type: 'input',s // Optional: You can set this dynamically if needed
    style: {
      borderRadius: '50%',
      borderColor: '#300c0c',
    },
    selectable: all_questions.includes(parseInt(node.id)),
  }));

  const [filename, setFilename] = useState<number>(1);

  return (
    <Stack dir="ltr">
      <Flex display={{base: "block", md: "none"}} paddingTop="90px" backgroundColor="black" zIndex={2} position="fixed" justify="center">
        <Box dir="rtl" width="95vw" height="25vh" margin="2%">
          <ReactFlow 
            colorMode="dark"
            nodes={nodes} 
            edges={edges} 
            onNodeClick={(_evt, node) => {
              if (!node.data.disabled) {
                setFilename(parseInt(node.id));
                setViewQuestions(true);
              }
            }}
            panOnDrag={true}
            panOnScroll={true}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            fitView
          >
            <Background />
          </ReactFlow>
        </Box>
      </Flex>

      <Flex justify="space-between" flexDir="row-reverse" paddingBottom="2%" paddingRight="0" marginTop={{base: "25vh", md: "120px"}}>
        <Box w={{base: "90%", md: "65%"}} display={viewQuestion ? "block" : "block"} marginRight={{base: "5%", md: "30%"}}>
          <MarkdownFile filePath={filename} />
        </Box>

        <Box display={{base: "none", md: "block"}} minW="30%" dir="rtl" position="fixed" height="80vh" padding="3%" zIndex={2}>
          <ReactFlow 
            style={{ height: "100%" }}
            colorMode="dark"
            nodes={nodes} 
            edges={edges} 
            onNodeClick={(_evt, node) => {
              if (!node.data.disabled) {
                setFilename(parseInt(node.id));
                setViewQuestions(true);
              }
            }}
            panOnDrag={true}
            panOnScroll={true}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            fitView
          >
            <Background />
          </ReactFlow>
        </Box>
      </Flex>
    </Stack>
  );
}

export default QuestionsPage;