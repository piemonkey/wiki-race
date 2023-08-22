alias Acl.Accessibility.Always, as: AlwaysAccessible
alias Acl.Accessibility.ByQuery, as: AccessByQuery
alias Acl.GraphSpec.Constraint.Resource.AllPredicates, as: AllPredicates
alias Acl.GraphSpec.Constraint.Resource, as: ResourceConstraint
alias Acl.GraphSpec.Constraint.ResourceFormat, as: ResourceFormatConstraint
alias Acl.GraphSpec, as: GraphSpec
alias Acl.GroupSpec, as: GroupSpec
alias Acl.GroupSpec.GraphCleanup, as: GraphCleanup

defmodule Acl.UserGroups.Config do
  def user_groups do
    # These elements are walked from top to bottom.  Each of them may
    # alter the quads to which the current query applies.  Quads are
    # represented in three sections: current_source_quads,
    # removed_source_quads, new_quads.  The quads may be calculated in
    # many ways.  The useage of a GroupSpec and GraphCleanup are
    # common.
    [
      # // PUBLIC
      # %GroupSpec{
      #   name: "public",
      #   useage: [:read],
      #   access: %AlwaysAccessible{},
      #   graphs: [ %GraphSpec{
      #               graph: "http://mu.semte.ch/graphs/public",
      #               constraint: %ResourceConstraint{
      #                 resource_types: [
      #                 ]
      #               } } ] },

      # // SAVED GAME DATA
      %GroupSpec{
        name: "games",
        useage: [:read, :write],
        access: %AccessByQuery{
          vars: ["accountName"],
          query: "
            PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
            PREFIX session: <http://mu.semte.ch/vocabularies/session/>
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            SELECT ?accountName
            WHERE {
              <SESSION_ID> session:account [foaf:accountName ?accountName].
            }
          "
        },
        graphs: [
          %GraphSpec{
            graph: "http://mu.semte.ch/graphs/games/",
            constraint: %ResourceFormatConstraint{
              resource_prefix: "http://mu.semte.ch/vocabularies/ext/game/"
            }
          }
        ]
      },

      # // CLEANUP
      #
      %GraphCleanup{
        originating_graph: "http://mu.semte.ch/application",
        useage: [:write],
        name: "clean"
      }
    ]
  end
end
