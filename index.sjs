// Define the "=." operator
macro (=.) {
  // Support syntax of this form: a=.b
  rule infix { $lhs:ident | $rhs } => {
    $lhs = $lhs.$rhs
  }
  // Support syntax of this form: a.b().c=.d
  case infix { $lhs:expr | _ $rhs:expr } => {
    // Helpers
    function moveCommentTo(src, dst) {
      src.token.leadingComments.forEach(function(comment) {
        var rangeDiff = comment.range[1] - dst.token.range[0];
        comment.range[1] -= rangeDiff;
        comment.range[0] -= rangeDiff;
      });
      dst.token.leadingComments = src.token.leadingComments;
      delete src.token.leadingComments;
    }

    var lhs = #{ $lhs };

    // Split the left-hand side
    var lhsInnerStx = lhs[0].token.inner;
    var lhsContext = lhsInnerStx.slice(0, -2);
    var lhsProp = lhsInnerStx[lhsInnerStx.length - 1];
    if (lhsProp.token.type !== parser.Token.Identifier) {
      throw new Error('Expected identifier right before the ".=" operator');
    }

    // Move the leading comments if they exist
    var contextFirstStx = lhsInnerStx[0];
    var varKeyword = makeKeyword("var", #{$ctx});
    if (contextFirstStx.token.leadingComments) {
      moveCommentTo(contextFirstStx, varKeyword);
    }

    // Create the syntaxes
    letstx $lhsContext = lhsContext;
    letstx $lhsProp = [lhsProp];
    letstx $varKeyword = [varKeyword];
    letstx $rhs = (#{$rhs})[0].token.inner;

    return #{
      (function () {
        $varKeyword lhsContext = $lhsContext;
        return lhsContext.$lhsProp = lhsContext.$lhsProp.$rhs;
      })()
    };
  }
}

export (=.)
