const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];

  const validEdges = new Set();
  const duplicateEdges = [];
  const invalidEntries = [];

  const graph = {};
  const childSet = new Set();

  // Step 1: Validate + Remove duplicates
  data.forEach((item) => {
    const trimmed = item.trim();

    if (!/^[A-Z]->[A-Z]$/.test(trimmed) || trimmed[0] === trimmed[3]) {
      invalidEntries.push(item);
      return;
    }

    if (validEdges.has(trimmed)) {
      if (!duplicateEdges.includes(trimmed)) {
        duplicateEdges.push(trimmed);
      }
      return;
    }

    validEdges.add(trimmed);

    const [parent, child] = trimmed.split("->");

    if (!graph[parent]) graph[parent] = [];
    graph[parent].push(child);

    childSet.add(child);
  });

  // Step 2: Find roots
  const roots = Object.keys(graph).filter((node) => !childSet.has(node));

  // Step 3: DFS to build tree
  const visited = new Set();

  function buildTree(node, path = new Set()) {
    if (path.has(node)) {
      return { cycle: true };
    }

    path.add(node);

    let subtree = {};
    let maxDepth = 1;

    for (let child of graph[node] || []) {
      const result = buildTree(child, new Set(path));

      if (result.cycle) return { cycle: true };

      subtree[child] = result.tree;
      maxDepth = Math.max(maxDepth, 1 + result.depth);
    }

    return { tree: subtree, depth: maxDepth };
  }

  const hierarchies = [];
  let totalTrees = 0;
  let totalCycles = 0;
  let maxDepth = 0;
  let largestRoot = "";

  const processed = new Set();

  Object.keys(graph).forEach((node) => {
    if (processed.has(node)) return;

    const result = buildTree(node);

    if (result.cycle) {
      hierarchies.push({
        root: node,
        tree: {},
        has_cycle: true,
      });
      totalCycles++;
    } else {
      hierarchies.push({
        root: node,
        tree: { [node]: result.tree },
        depth: result.depth,
      });

      totalTrees++;

      if (
        result.depth > maxDepth ||
        (result.depth === maxDepth && node < largestRoot)
      ) {
        maxDepth = result.depth;
        largestRoot = node;
      }
    }

    processed.add(node);
  });

  res.json({
    user_id: "chakri",
    email_id: "rr8410@srmist.edu.in",
    college_roll_number: "RA2311056010057",
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestRoot,
    },
  });
});
const path = require("path");

// serve static files
app.use(express.static(__dirname));

// route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(3000, () => console.log("Server running on port 3000"));